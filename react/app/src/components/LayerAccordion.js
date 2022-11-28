import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const LayerAccordion = (props) => {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        {props.title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>{props.card}</div>
                </AccordionDetails>
            </Accordion>
        </div>

    );
}

export default LayerAccordion;
