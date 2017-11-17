import React, {Component} from 'react';

class Home extends Component {
    render(){
        return(
            <div className='background'>
                <div className='layer'>
                    <h2 className="welcome"> Welcome to Oversee D &amp; D</h2>
                    <h3>your online campaign tracker for Dungeons and Dragons 5E</h3>
                    <br/>
                    <p>Login or Sign Up to begin your D &amp; D campaign. </p>
                    <br/>
                    <p>Everyone in the campaign can add their characters and stats, and also share notes and maps to keep make sure you are keeping track of all all the details!</p>
                    <p>Once you've started your campaign, add the rest of your party and track your Quest! </p>
                    {/* lorem impsum */}
                    <p></p>
                </div>
            </div>
        )
    }
}

export default Home;