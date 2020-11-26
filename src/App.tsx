import {Provider} from "react-redux";
import Store from './redux/store'
import Calendar from "./pages/Calendar";
import React from "react";
import * as Realm from 'realm-web';

function App() {

    const REALM_APP_ID = "calendario-vbjsi";
    const app : Realm.App = new Realm.App({id: REALM_APP_ID});

    React.useEffect(() => {
        app.logIn(Realm.Credentials.anonymous())
            .then(() => console.log('Usuário logado anonimamente.'));
    })

    return (
        <Provider store={Store}>
            <Calendar app={app} />
        </Provider>
    );
}

// @ts-ignore
export default App;