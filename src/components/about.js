import React from 'react'
import {Link, } from 'react-router-dom'

const About=({match})=>(
    <div>
        <h1>
            About
        </h1>
        {
            getAboutStuff().map(user=>
                <Link to={`${match.url}/${user.id}`}>
                    User {user.id}
                    <br></br>
                </Link>

            )
        }
    </div>
)

const getAboutStuff=()=>{
    let list=[]
    for (let index = 0; index < 5; index++) {
        list.push({id:index})
        
    }
    return list
}

export default About