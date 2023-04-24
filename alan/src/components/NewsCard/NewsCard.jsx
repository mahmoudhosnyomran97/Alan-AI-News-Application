import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import useStyles from './styles.js';
import classNames from 'classnames';

const NewsCard = ({ article : { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
  
    useEffect(() => {
      window.scroll(0, 0);
  
      setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);
  
    useEffect(() => {
      if (i === activeArticle && elRefs[activeArticle]) {
        scrollToRef(elRefs[activeArticle]);
      }
    }, [i, activeArticle, elRefs]);

  return (
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
        <CardActionArea href={url} target='_blank'>
            <CardMedia className={classes.media} image={ urlToImage || 'https://elements-video-cover-images-0.imgix.net/files/388693577/preview.jpg?auto=compress%2Cformat&fit=min&h=225&w=400&s=1fa38df182e0442e4ff43c71cc9d9892' } />
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary' component='h2'>
                    {(new Date(publishedAt)).toDateString()}
                </Typography>

                <Typography variant='body2' color='textSecondary' component='h2'>
                    {source.name}
                </Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant='h5'>
                {title}
            </Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {description}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
            <Button size='small' color='primary'>
                Learn More
            </Button>
            <Typography variant='h5' color='textSecondary'>
                {i + 1}
            </Typography>
        </CardActions>
    </Card>
  );
}

export default NewsCard;