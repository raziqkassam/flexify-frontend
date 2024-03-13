import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';


const InstructionAccordion = ({accordion = {}, positioning = {}, exercise = {}, rest = {}, frequency = {}, images={}}) => {
    
    return (
    <Accordion defaultExpanded={false}
        sx={{
            backgroundColor: "#ecede8",
            borderRadius: "20px",
            margin: "30px 0 0px 0",
            boxShadow: "none",
            border: "2px solid #95e2ea",
        }}
        >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#40ccd9", fontSize:'40px', mr:'50px'}} />}
        sx={{ margin: "15px", }} >
          <Typography color={"#4f9658"} fontWeight={"bold"} variant="h2">
            {accordion.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            margin: "0px 15px 30px 15px",
          }}
        >
          <Grid container > 
            <Grid item xs={7} padding={'0 30px 0 30px'}>
              <Typography >
                  <Typography sx={{fontSize:'25px', fontWeight:'bold', color: '#2c5331'}}>
                    {positioning.title}
                  </Typography>
                  <Typography sx={{fontSize:'20px', color: '#2c5331'}}>
                    {positioning.description} 
                  </Typography><br/>
                  <Typography sx={{fontSize:'25px', fontWeight:'bold', color: '#2c5331'}}>
                    {positioning.startingTitle}
                  </Typography>
                  <Typography sx={{fontSize:'20px', color: '#2c5331'}}>
                    {positioning.starting} 
                  </Typography><br/>
                  {Object.keys(exercise).length > 0 && (
                    <>
                    <Typography sx={{fontSize:'25px', fontWeight:'bold', color: '#2c5331'}}>
                      {exercise.title}
                    </Typography>
                    <Typography sx={{fontSize:'20px', color: '#2c5331'}}>
                    <li>{exercise.one}</li>
                    <li>{exercise.two}</li>
                    <li>{exercise.three}</li>
                    <li>{exercise.four}</li>                
                    </Typography><br/>
                    </>
                  )}
                  <Typography sx={{fontSize:'25px', fontWeight:'bold', color: '#2c5331'}}>
                    {rest.title}
                  </Typography>
                  <Typography sx={{fontSize:'20px', color: '#2c5331'}}>
                    {rest.description}
                  </Typography><br/>
                  <Typography sx={{fontSize:'25px', fontWeight:'bold', color: '#2c5331'}}>
                    {frequency.title}
                  </Typography>
                  <Typography sx={{fontSize:'20px', color: '#2c5331'}}>
                    {frequency.description}
                  </Typography>
              </Typography>
            </Grid>
            <Grid item xs={5} >
            {Object.keys(images).length > 0 && (
              <Grid container direction="column">
                <Grid item xs={8} textAlign={'center'}>
                  <img src={exercise.gif} alt={`${exercise.title} Exercise`} style={{ alignContent: 'center', maxWidth: "50%", height: "auto" }}/>
                </Grid>
                <Grid item xs={4} padding="20px">
                  <Grid container>
                    <Grid item xs={4}>
                      <img src={images.one} alt="1" style={{ maxWidth: "100%", height: "auto" }}/>
                    </Grid>
                    <Grid item xs={4}>
                      <img src={images.two} alt="2" style={{ maxWidth: "100%", height: "auto" }}/>
                    </Grid>
                    <Grid item xs={4}>
                      <img src={images.three} alt="3" style={{ maxWidth: "100%", height: "auto" }}/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
};

export default InstructionAccordion;