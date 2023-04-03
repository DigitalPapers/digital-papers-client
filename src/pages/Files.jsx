import { useCallback, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { ClientsService } from "../services/clients.service";

export function Files() {
  const { id: userID } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [error, setError] = React.useState(null);

  const fetchData = useCallback(({ id }) => {
    ClientsService()
      .get(id)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      });
  });
  return <h1> Files client {userID}</h1>;
}
