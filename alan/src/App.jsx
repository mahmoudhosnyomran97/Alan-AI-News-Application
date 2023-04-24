import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import { Grid, Grow, Typography } from '@mui/material';
import alan from '@alan-ai/alan-sdk-web';


const alanKey = '12424f50e38f5b63192c16c838023ec62e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [ newsArticles, setNewsArticles ] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key : alanKey,
            onCommand : ({ command, articles, number, welcome }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                } else if (command === 'open'){
                    window.open(articles[number - 1].url, '_blank');
                }
            }
        })
    }, [])

  return (
    <div>
        <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
            <img src='https://alan.app/static/video-pic-06@2x-817188918225cbf1fe90b39445c5e23e.png' className={classes.alanLogo} alt='Alan Logo'  />
        </div>
        <NewsCards articles = {newsArticles} activeArticle = {activeArticle} />
    </div>
  )
}

export default App;