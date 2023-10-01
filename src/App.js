import axios from "axios";
import Cookies from "js-cookie";
import { memo, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loginUrl } from "./endpoints";
//
// import "./styles/feedColCss.css";
// import "./styles/leftColCss.css";
// import "./styles/components.css";
import "./styles/index.css";
// import "./styles/userProfile.css";
// import "./styles/mediaQuery.css";
// import "./styles/userSettingsComponent.css";
import NavBar from "./components/navbar";
import Body from "./components/body";
import AppContext from "./components/context/appContext";
import { scrollToTop } from "./components/utils/apiCalls";
//

let userData = null;
let App = memo(() => {
  let location = useLocation();
  let { state, setState } = useContext(AppContext);
  useEffect(() => {
    if (!state?.user) {
      let token = Cookies.get("thedev");
      if (token) {
        function getData() {
          try {
            axios.post(loginUrl, { token }).then(async (res) => {
              userData = res.data;
              if (userData !== null) {
                state.currentPath = location.pathname;
                setState({
                  ...state,
                  loginStatus: true,
                  user: userData.data,
                });
              } else {
              }
            });
          } catch (err) {
            console.log(err);
          }
        }
        scrollToTop();
        getData();
      }
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div className="main">
      <NavBar />
      <Body />
    </div>
  );
});

export default App;
