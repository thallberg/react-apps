import NewsItem from "./status-icon-label/StatusIconLabel";


function App() {


  return (
    <>
<NewsItem
  color="purple"
  title="Nytt kontrakt"
  user="Företag AB"
  createdBy="admin_user"
  date="2025-05-23"
  time="10:30"
  content="Ett nytt kontrakt har skapats."
  linkContract="https://example.com/contract"
  linkPurchase="https://example.com/purchase"
  onDelete={() => console.log("Raderat")}
/>


    </>
  );
}

export default App;
