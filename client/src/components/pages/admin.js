import React, { useState } from 'react';
import Header from '../items/header.js';
import '../../css/admin.css';
function Admin({onLogout}) {
    return(
        <div>
            <Header onLogout={onLogout}></Header>
            
        </div>
    )
}

export default Admin;