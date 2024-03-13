import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from '@mui/material/Grid';


const About = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="0px auto auto" display="flex" flexDirection="column" height="100vh"> 
            {/* Box for "About Us" text */}
            <Box m="50px auto 75px">
                <Typography fontSize={50} fontWeight="900" sx={{ color: colors.primary[900] }} >
                    About Us
                </Typography>
            </Box>
            {/* Main content */}
            <Box display="flex" alignItems="center">
                {/* Box for the image */}
                <Box mr={10}>
                    <img src="https://www.startupdonut.co.uk/sites/default/files/production%20image/physiotherapist.jpg" alt="PT helping patient in clinic" style={{ width: '574px', height: '348px' }} />
                </Box>
                {/* Box for the text content */}
                <Box display="flex" flexDirection="column" alignItems="space-between" justifyContent="space-between">
                    <Box>
                        <Typography fontSize={30} fontWeight="900" sx={{ color: colors.primary[600] }} >
                            Our Vision
                        </Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography fontSize={15} fontWeight="100" sx={{ color: colors.primary[300] }} >
                        At R.O.M.E.T, we're pioneering a future where rehabilitation transcends boundaries. Recognizing the pivotal role of home exercise adherence in 
                        recovery, especially for acute wrist fractures, we're committed to revolutionizing rehabilitation through technology. 
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography fontSize={15} fontWeight="100" sx={{ color: colors.primary[300] }} >
                        Our vision is to seamlessly integrate cutting-edge solutions that empower patients and medical professionals to monitor progress remotely, 
                        ensuring adherence to prescribed exercises without compromising outcomes. By harnessing digital tools to track Range of Motion (ROM) exercises, 
                        we're not just enhancing recovery; we're reshaping the entire rehabilitation experience.                        
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography fontSize={15} fontWeight="100" sx={{ color: colors.primary[300] }} >
                        Beyond individual patients, our goal is to optimize resource allocation in healthcare while building a healthier, more connected world. Join us 
                        in shaping the future of rehabilitation—one exercise at a time.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* Box for "Core Values" title text */}
            <Box m="50px auto 10px">
                <Typography fontSize={30} fontWeight="900" sx={{ color: colors.primary[600] }} >
                    Core Values
                </Typography>
            </Box>
            {/* Box for "Core Values" title text */}
            <Box m="0px 200px 50px">
                <Typography fontSize={15} fontWeight="100" textAlign="center" sx={{ color: colors.primary[300] }} >
                Our core values center around empathy and compassion, ensuring that we approach every interaction with understanding of the unique challenges 
                faced by individuals recovering from wrist injuries. We are committed to accessibility and inclusivity, making our rehabilitation services available 
                to everyone regardless of geographic location, socioeconomic status, or physical ability. Additionally, we prioritize environmental responsibility, 
                striving to minimize our operations' impact by adopting sustainable practices that promote both patient health and planetary well-being.
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {[
                    { 
                        title: "Patient-Centered Care", 
                        description: "Our product prioritizes the needs and well-being of patients above all else, ensuring their comfort, satisfaction, and progress throughout the rehabilitation process.",
                        imageSrc: "image2.jpg" // having a lot of issues trying to input images
                    },
                    { 
                        title: "Accessibility and Inclusivity", 
                        description: "We strive to make rehabilitation services accessible to all, regardless of geographic location, socioeconomic status, or physical ability.",
                        imageSrc: "image2.jpg" // 
                    },
                    { 
                        title: "Innovation and Adaptability", 
                        description: "Our team embraces innovation and continually seeks out new technologies, techniques, and approaches to enhance the effectiveness and efficiency of wrist rehabilitation programs.",
                        imageSrc: "image3.jpg" // 
                    }
                ].map((value, index) => (
                    <Grid item key={index}>
                        <Box
                            sx={{
                                width: '300px',
                                height: '350px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                borderRadius: '12px',
                                backgroundColor: colors.primary[200],
                                color: colors.primary[600],
                                padding: '20px',
                            }}
                        >
                            <img src={value.imageSrc} alt="Core Value Image" style={{ width: '100%', marginBottom: '10px' }} />
                            <Typography variant="h5" fontWeight="bold">{value.title}</Typography>
                            <Typography>{value.description}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box m="50px auto 10px">
                <Typography fontSize={30} fontWeight="900" sx={{ color: colors.primary[600] }} >
                    Relevant Literature
                </Typography>
            </Box>
            <Box m="0px 100px 0px">
                <Typography fontSize={15} fontWeight="100" textAlign="center" sx={{ color: colors.primary[300] }} >
                Distal Radius Fractures (DRFs) constitute a significant and pervasive health concern, with statistics revealing that 1 in 6 fractures globally are 
                attributed to this orthopedic condition [1]. This alarming prevalence is further underscored by recent data indicating a widespread increase in 
                DRFs across all age groups, highlighting the urgency for innovative approaches to address this growing healthcare challenge [2]. In the United States, 
                the economic burden of treating pediatric DRFs alone exceeds $2 billion annually, signifying not only a substantial financial strain on public resources 
                but also emphasizing the profound societal impact of this condition [2]. Early physiotherapy emerges as a pivotal factor in enhancing functional recovery 
                and promoting increased wrist flexion in patients with DRFs [1]. The treatment focuses on exercises to improve one’s Range of motion (ROM), which is 
                pivotal to all kinds of rehabilitation,  as it restores flexibility and functionality. Such exercises reduce stiffness and enhance overall mobility, 
                facilitating a smoother recovery to a normal range of joint motion. However, a critical challenge lies in addressing the disparities faced by 
                approximately 25% of Canadians residing in rural and remote areas, where access to specialized healthcare resources is limited [3]. 
                </Typography>
            </Box>
            <Box m="50px auto 10px">
                <Typography fontSize={30} fontWeight="900" sx={{ color: colors.primary[600] }} >
                    References:
                </Typography>
            </Box>
            <Box m="0px 0px 0px">
                <Typography fontSize={15} fontWeight="100" textAlign="left" sx={{ color: colors.primary[300] }} >
                [1] M. Tomruk, N. Gelecek, O. Basçi, and M. H. Özkan, “Effects of early manual therapy on functional outcomes after volar plating of distal radius fractures: A randomized controlled trial,” Hand Surgery and Rehabilitation, vol. 39, no. 3, pp. 178–185, 2020. doi:10.1016/j.hansur.2019.12.002  
                </Typography>
            </Box>
            <Box m="0px 0px 0px">
                <Typography fontSize={15} fontWeight="100" textAlign="left" sx={{ color: colors.primary[300] }} >
                [2] K. W. Nellans, E. Kowalski, and K. C. Chung, “The epidemiology of distal radius fractures,” Hand Clinics, vol. 28, no. 2, pp. 113–125, 2012. doi:10.1016/j.hcl.2012.02.001                     
                </Typography>
            </Box>
            <Box m="0px 0px 0px">
                <Box mb="50px">{/* Adding an empty Box with a height of 50px for space */}
                <Typography fontSize={15} fontWeight="100" textAlign="left" sx={{ color: colors.primary[300] }} >
                [3] D. M. Ford, “Four persistent rural healthcare challenges,” Healthcare Management Forum, vol. 29, no. 6, pp. 243–246, 2016. doi:10.1177/0840470416658903                </Typography>
                </Box>
            </Box>
        </Box>
      );    
};

export default About;