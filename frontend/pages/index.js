import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const Home = () => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState({});
  useEffect(() => {
    // connect to the socket server
    const socket = io("http://localhost:3001", { transport: ['websocket'] });

    // when connected, look for when the server emits the updated count
    socket.on('frontend', function (dat) {
      // set the new count on the client
      setStatus(dat.data?.status);
      let tempData = dat.data;
      delete tempData.status;
      setData(tempData)
    })
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  if (!Object.keys(data).length) {
    return <h1>loading...</h1>
  }

  return (
    <div style={{ padding: "0 1rem" }}>
      <h3>DATA</h3>
      <table>
        {Object.keys(data).map(item => (
          <tr key={item}>
            <th>{item}</th>
            <td>{data[item]}</td>
          </tr>
        ))}
      </table>
      <h3>STATUS</h3>
      <table>
        {Object.keys(status).map(item => (
          <tr key={item}>
            <th>{item}</th>
            <td>{status[item]?.toString()}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
export default Home;