import React, {Component} from 'react';

class Home extends Component {
    render(){
        return(
            <div className='homepage'>
                <div className='layer'>
                    <h2 className="welcome"> Welcome to your online Campaign tracker for Dungeons and Dragons 5E</h2>
                    <p>Login or Sign Up to begin your D &amp; D campaign. </p>
                    <p>Once you've started your campaign, add the rest of your party and track your Quest </p>
                    {/* lorem impsum */}
                    <p>
                        Just an update a couple years later: I currently use this method all over kotulas.com, and there's no significant slowdown that I've noticed. It could become an issue if you're using it on hundreds of elements, but even on a page with 150+ images, it's not an issue for me. (And this is on a work computer.) Naturally, you'll want to test it ahead of time to make sure that it's right for you. And as for old browser compatibility, since the fallback is that the user doesn't see a hover-over effect (with no other problems), I'm ok with that.</p>
                </div>
            </div>
        )
    }
}

export default Home;