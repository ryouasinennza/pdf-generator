import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const colors = {
  primary: '#92e8f5',
  secondary: '#f50057',
  border: '#92e8f5',
  primary8: 'rgba(146, 232, 245, 0.8)',
  primary5: 'rgba(146, 232, 245, 0.5)',
}

// クラス名指定で変更できます
const CustomOutLineButton = withStyles({
  root: {
    color: colors.secondary,
    borderColor: colors.border,
    backgroundColor: colors.primary,
    '&:hover': {
      color: colors.secondary,
      backgroundColor: colors.primary8,
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

export const OutLineButton = (props) => {

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
