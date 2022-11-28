import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const LayerButtonGroup = (props) => {
    console.log(props.buttons)
    return (
        <ButtonGroup
            orientation="horizontal"
            aria-label="button group"
        >
            {props.buttons.map((button, index) =>
                <div key={index}>{button}</div>
            )}
        </ButtonGroup>
    );
}

export default LayerButtonGroup;

/* import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup() {
  return (
    <ButtonGroup variant="vertical" aria-label="outlined primary button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
} */
