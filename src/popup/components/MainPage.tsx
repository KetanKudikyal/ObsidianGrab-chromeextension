import * as React from "react";
import { useState, useEffect } from "react";
import { getting_workflows } from "../../background_script";
import WorkflowPage from "./Workflow";
import { auth } from "../../background_script/firebase";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const MainPage = () => {
  const [userdata, setuserdata] = useState<[]>([]);
  const [Workflow, setWorkflow] = useState<boolean>(false);
  const [repoNames, setrepoNames] = useState<string[]>([]);
  async function fetchdata() {
    const token = localStorage.getItem("accesstoken");
    console.log("ABye", token);
    const req = await fetch("https://api.github.com/user/repos?type=owner", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
      },
    });
    const data = await req.json();
    const Repos = data.map((reponame: any) => {
      return reponame.full_name
    })
    setrepoNames(Repos)
    setuserdata(...userdata, data);
  }

  console.log("UseState" , repoNames);
  
  React.useEffect(() => {
    fetchdata();
  }, []);

  const workflows = (name:string) => {
    setWorkflow(true);
    console.log(Workflow);
    console.log("workflows" , name)
    getting_workflows(name);
  };

  return (
    <div>
      {Workflow ? (
        <WorkflowPage />
      ) : (
          <div>
            <button onClick={() => auth.signOut()}>logout</button>
            <h1>Select the repo</h1>
            <Autocomplete
            id="combo-box-demo"
            options={repoNames}
            getOptionLabel={(option:string) => option}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" onClick={() => console.log(params)} variant="outlined" />}
    />
          {/* {repoNames.map(function (value: any) {
            const name = value;
            console.log(name);
            
            localStorage.setItem("repoName", name);
            return (
              <div>
                <li>
                  <button onClick={() => workflows(name)}>{name}</button>
                </li>
              </div>
            );
          })} */}
        </div>
      )}
    </div>
  );
};

export default MainPage;

// onClick={(e) => {
//   e.preventDefault();
// localStorage.setItem("repoName", name);
//   // console.log(localStorage.getItem("repoName"));
//   // <Workflow/>
//   // getting_workflows()
//   setWorkflow(true);
// }}





































// import * as React from "react";
// import { auth, signoutfromgithub ,getgithubdata  } from "../../background_script";
// import { makeStyles } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// const MainPage = (props: any) => {
//   const classes = useStyles();
//   const { currentUser } = props;
//   return (
//     <div>
//       <div className={classes.root}>
//         <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/66976099?s=60&v=4" />
//       </div>
//       <button onClick={signoutfromgithub}>Logout</button>
//       <button onClick={getgithubdata }>getrepos</button>
//     </div>
//   );
// };

// export default MainPage;
