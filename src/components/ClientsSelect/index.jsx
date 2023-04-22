import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { ClientsService } from "../../services/clients.service";
import { isNotEmptyString } from "../../utils/validators/isNotEmptyString";

export default function ClientSelect({ setError, setClient }) {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let active = true;

    const optionsFetch = isNotEmptyString(searchValue)
      ? { search: searchValue }
      : {
          pageIndex: 0,
          pageSize: 5,
        };

    ClientsService()
      .list(optionsFetch)
      .then((response) => {
        setIsLoading(false);
        if (active) {
          setOptions(response.users);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        setError({ active: true, message: error.message });
      });

    return () => {
      active = false;
    };
  }, [searchValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleOnInputChange = (event, value) => {
    event.preventDefault();
    console.log("Entro aqui al handleOnInputChange");
    setSearchValue(value);
    setIsLoading(true);
    return value;
  };

  const handleOnChange = (event, newValue) => {
    event.preventDefault();
    setClient(newValue?.id);
  };

  return (
    <Autocomplete
      id="clients-select"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={handleOnChange}
      onInputChange={handleOnInputChange}
      options={options}
      loading={isLoading}
      loadingText={"Cargando..."}
      noOptionsText={"No se encontraron resultados"}
      getOptionLabel={(option) => option.rfc ?? option.rfc}
      isOptionEqualToValue={(option, value) => option.rfc === value.rfc}
      sx={{ width: "100%" }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Buscar por RFC"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
    />
  );
}
