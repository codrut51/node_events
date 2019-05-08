import React from 'react';
import Header from '../components/header';
import Body from '../components/content';
import Footer from '../components/footer';

class Main extends React.Component {
 
  click_listener = (event) => {
    console.log("Here!");
  }
  componentDidMount() {
    document.addEventListener("click_event", this.click_listener);
  }
  render() {
    return (
      <div id="content">
        <div className="root" spacing={0}>
            <Header></Header>
            {/* <Body></Body>
            <Footer></Footer> */}
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