import React from 'react';
import Header from '../components/header';
import Body from '../components/content';
import Footer from '../components/footer';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     height: "20vh",
//     minHeight: "150px",
//   },
//   control: {
//     padding: theme.spacing.unit * 2,
//   },
// });

class Main extends React.Component {
  render() {
    return (
      <div id="content">
        <div className="root" spacing={0}>
            <Header></Header>
            <Body></Body>
            <Footer></Footer>
        </div>
      </div>
    );
  }
}


/*


          <Grid item xs={12} className="header">
              <Grid container spacing={8}>
                  <Grid item xs={12}>
                      <Paper className="paper" > </Paper>
                  </Grid>
              </Grid>
          </Grid>
          <Grid item xs={12} className="body">
              <Grid container spacing={8}>
                  <Grid item xs={4}>
                      <Paper className="paper" > </Paper>
                  </Grid>
                  <Grid item xs={4}>
                      <Paper className="paper" > </Paper>
                  </Grid>
                  <Grid item xs={4}>
                      <Paper className="paper" > </Paper>
                  </Grid>
              </Grid>
          </Grid>
          <Grid item xs={12} className="header">
              <Grid container spacing={8}>
                  <Grid item xs={12}>
                      <Paper className="paper" > </Paper>
                  </Grid>
              </Grid>
          </Grid>

*/
// Main.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Main);
export default Main;