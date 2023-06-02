import "./App.css";
import Layout from "./Layout/layout";
import { RouteComponent } from "./routes";
function App() {
  return (
    <>
      <Layout>
        <RouteComponent />
      </Layout>
    </>
  );
}
export default App;