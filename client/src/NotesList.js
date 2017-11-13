import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';

class NotesList extends Component{
    render(){
        return(
            <div>
                Test Notes
            </div>
        )
    }
}

export default NotesList;