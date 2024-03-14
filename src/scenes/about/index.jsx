import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';


const About = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box p="30px 50px 100px 50px" display="flex" flexDirection="column" > 
            {/* Box for "About Us" text */}
            <Box m="30px auto 50px">
                <Typography fontSize={70} fontWeight="900" sx={{ color: colors.blueAccent[400] }} >
                    About Us
                </Typography>
            </Box>
            {/* Main content */}
            <Box display="flex" alignItems="center">
                {/* Box for the image */}
                <Box mr={10} width={'150vw'} >
                    <img src="/assets/team.jpg" alt="PT helping patient in clinic" 
                    style={{ width: '100%',  borderRadius:'20px', border: `5px solid ${colors.blueAccent[400]}`, }} />
                </Box>
                {/* Box for the text content */}
                <Box display="flex" flexDirection="column" alignItems="space-between" justifyContent="space-between">
                    <Box>
                        <Typography fontSize={35} fontWeight="900" sx={{ color: colors.primary[600] }} >
                            Our Vision
                        </Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography fontSize={20} fontWeight="400" sx={{ color: colors.primary[800] }} >
                        At R.O.M.E.T, we're pioneering a future where rehabilitation transcends boundaries. Recognizing the pivotal role of home exercise adherence in 
                        recovery, especially for acute wrist fractures, we're committed to revolutionizing rehabilitation through technology. 
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography fontSize={20} fontWeight="100" sx={{ color: colors.primary[800] }} >
                        Our vision is to seamlessly integrate cutting-edge solutions that empower patients and medical professionals to monitor progress remotely, 
                        ensuring adherence to prescribed exercises without compromising outcomes. By harnessing digital tools to track Range of Motion (ROM) exercises, 
                        we're not just enhancing recovery; we're reshaping the entire rehabilitation experience.                        
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography fontSize={20} fontWeight="100" sx={{ color: colors.primary[800] }} >
                        Beyond individual patients, our goal is to optimize resource allocation in healthcare while building a healthier, more connected world. Join us 
                        in shaping the future of rehabilitation—one exercise at a time.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* Box for "Core Values" title text */}
            <Box m="50px auto 10px">
                <Typography fontSize={35} fontWeight="900" sx={{ color: colors.primary[600] }} >
                    Core Values
                </Typography>
            </Box>
            {/* Box for "Core Values" title text */}
            <Box m="0px 0px 20px">
                {/* <Typography fontSize={20} fontWeight="100" textAlign="center" sx={{ color: colors.primary[800] }} >
                Our core values center around empathy and compassion, ensuring that we approach every interaction with understanding of the unique challenges 
                faced by individuals recovering from wrist injuries. We are committed to accessibility and inclusivity, making our rehabilitation services available 
                to everyone regardless of geographic location, socioeconomic status, or physical ability. Additionally, we prioritize environmental responsibility, 
                striving to minimize our operations' impact by adopting sustainable practices that promote both patient health and planetary well-being.
                </Typography> */}
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {[
                    { 
                        title: "Patient-Centered Care", 
                        description: "Our product prioritizes the needs and well-being of patients above all else, ensuring their comfort, satisfaction, and progress throughout the rehabilitation process.",
                        imageSrc: "/assets/icons/pcc.png" 
                    },
                    { 
                        title: "Accessibility and Inclusivity", 
                        description: "We strive to make rehabilitation services accessible to everyone, regardless of geographic location, socioeconomic status, or physical ability.",
                        imageSrc: "/assets/icons/com.png" 
                    },
                    { 
                        title: "Innovation and Adaptability", 
                        description: "Our team embraces innovation and continually seeks out new technologies, techniques, and approaches to enhance the effectiveness and efficiency of wrist rehabilitation programs.",
                        imageSrc: "/assets/icons/inn.png" 
                    }
                ].map((value, index) => (
                    <Grid item key={index}>
                        <Box
                            sx={{
                                width: '400px', height: '470px',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', textAlign: 'center',
                                borderRadius: '50px',
                                backgroundColor: colors.blueAccent[200],
                                color: colors.primary[600],
                                padding: '40px 25px',
                            }}
                        >
                            <img src={value.imageSrc} alt="Core Value Image" style={{ width: '60%', marginBottom: '20px', borderRadius:'20px' }} />
                            <Typography variant="h5" fontWeight="bold" fontSize={25} sx={{color: colors.blueAccent[900]}} >
                                {value.title}
                            </Typography>
                            <Typography fontSize={18} sx={{color: colors.blueAccent[800]}} >
                                {value.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box m="50px auto 10px">
                <Typography fontSize={35} fontWeight="900" sx={{ color: colors.primary[600] }} >
                    Relevant Literature
                </Typography>
            </Box>
            <Box m="0px 100px 0px">
                <Typography fontSize={18} fontWeight="100" textAlign="center" sx={{ color: colors.primary[800] }} >
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
            <Box m="50px auto 50px">
                <Typography fontSize={30} fontWeight="900" sx={{ color: colors.primary[600] }} >
                    References:
                </Typography>
            </Box>
            <Box m="0px 0px 0px">
                <Typography fontSize={18} fontWeight="100" textAlign="left" sx={{ color: colors.primary[800] }} >
                [1] M. Tomruk, N. Gelecek, O. Basçi, and M. H. Özkan, “Effects of early manual therapy on functional outcomes after volar plating of distal radius fractures: A randomized controlled trial,” Hand Surgery and Rehabilitation, vol. 39, no. 3, pp. 178–185, 2020. doi:10.1016/j.hansur.2019.12.002  
                <br/></Typography>
            </Box>
            <Box m="0px 0px 0px">
                <Typography fontSize={18} fontWeight="100" textAlign="left" sx={{ color: colors.primary[800] }} >
                <br/>[2] K. W. Nellans, E. Kowalski, and K. C. Chung, “The epidemiology of distal radius fractures,” Hand Clinics, vol. 28, no. 2, pp. 113–125, 2012. doi:10.1016/j.hcl.2012.02.001                     
                </Typography>
            </Box>
            <Box m="0px 0px 0px">
                <Box mb="50px">{/* Adding an empty Box with a height of 50px for space */}
                <Typography fontSize={18} fontWeight="100" textAlign="left" sx={{ color: colors.primary[800] }} >
                <br/>[3] D. M. Ford, “Four persistent rural healthcare challenges,” Healthcare Management Forum, vol. 29, no. 6, pp. 243–246, 2016. doi:10.1177/0840470416658903                </Typography>
                </Box>
            </Box>
        </Box>
      );    
};

export default About;