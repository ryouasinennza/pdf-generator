import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const colors = {
  primary: '#e79090',
  secondary: '#ff0000',
  border: '#be6767',
  primary5: 'rgba(146, 232, 245, 0.5)',
}

// クラス名指定で変更できます
const CustomOutLineButton = withStyles({
  root: {
    color: colors.secondary,
    borderColor: colors.border,
    backgroundColor: colors.primary,
    fontSize: 10,
    padding: '0px 12px',
    '&:hover': {
      color: colors.secondary,
    },
    '& .MuiTouchRipple-root': {
      color: colors.primary5,
    },
  },
})(Button);


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const DeleteButton = (props) => {

  const classes = useStyles();
  const {
    children,
    onClick,
  } = props
  return (
    <CustomOutLineButton
      onClick={onClick}
      variant="outlined"
      className={classes.margin}
    >{children}</CustomOutLineButton>
  );
}
