import { Grid2Props as GridProps } from '@mui/material/Grid2';
import { TypographyProps } from '@mui/material/Typography';
import { BoxProps } from '@mui/material/Box';
import { StackProps } from '@mui/material/Stack';

export const cardContainer: GridProps = {
  size: 12,
  container: true,
  sx: {
    backgroundColor: '#f0f8ff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    padding: 3,

    boxSizing: 'border-box',
  },
};

export const cardStack: StackProps = {
  direction: 'column',
};

export const noDataBox: BoxProps = {
  sx: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25vh',
    padding: 2,
    textAlign: 'center',
    backgroundColor: '#e3f2fd',
    color: '#5c6bc0',
  },
};

export const noDataLabel: TypographyProps = {
  variant: 'h6',
};

export const topGrid: GridProps = {
  size: 12,
  container: true,
  sx: {
    padding: 1,
    backgroundColor: '#1565c0',
    color: '#ffffff',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  },
};

export const topLeftGrid: GridProps = {
  size: 6,
  container: true,
  alignItems: 'center',
  sx: {
    gap: 1,
  },
};

export const topRightGrid: GridProps = {
  size: 6,
  container: true,
  direction: 'column',
  alignItems: 'flex-end',
  sx: {},
};

export const genderMaleBox: BoxProps = {
  sx: {
    backgroundColor: '#1976d2', // Bright blue
    color: '#fff',
    borderRadius: '50%',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32px',
    height: '32px',
  },
};

export const genderFemaleBox: BoxProps = {
  sx: {
    backgroundColor: '#ec407a', // Pinkish tone
    color: '#fff',
    borderRadius: '50%',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32px',
    height: '32px',
  },
};

export const idBox: BoxProps = {
  sx: {
    paddingX: 1.5,
    paddingY: 0.5,
    backgroundColor: '#1e88e5', // Medium blue
    color: '#fff',
    borderRadius: '16px',
    fontSize: '0.75rem',
    display: 'inline-block',
  },
};

export const breedLabel: TypographyProps = {
  variant: 'caption',
  sx: {
    color: '#90caf9',
  },
};

export const birthDateLabel: TypographyProps = {
  variant: 'caption',
  sx: {
    color: '#90caf9',
  },
};

export const middleGrid: GridProps = {
  container: true,
  size: 12,
  sx: {
    padding: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const middleLeftGrid: GridProps = {
  size: 7,
  container: true,
  direction: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
};

export const middleRightGrid: GridProps = {
  size: 5,
  container: true,
  direction: 'column',
  sx: {
    gap: 1,
  },
};

export const parentGrid: GridProps = {
  container: true,
  justifyContent: 'flex-end',
};

export const parentIdGrid: GridProps = {
  size: 9,
};

export const parentLabelGrid: GridProps = {
  size: 3,
};

export const parentIdLabel: TypographyProps = {
  variant: 'body1',
  sx: {
    backgroundColor: '#e3f2fd',
    paddingX: 1,
    paddingY: 0.5,
    borderRadius: '8px',
  },
};

export const parentLabel: TypographyProps = {
  variant: 'caption',
  sx: {
    fontWeight: 'bold',
  },
};

export const nameLabel: TypographyProps = {
  variant: 'h5',
};

export const bottomGrid: GridProps = {
  size: 12,
  container: true,
  sx: {
    backgroundColor: '#e3f2fd',
    padding: 2,
    borderTop: '1px solid #ddd',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  },
};

export const bottomLeftGrid: GridProps = {
  size: 6,
  container: true,
  direction: 'column',
};

export const bottomRightGrid: GridProps = {
  size: 6,
  container: true,
  justifyContent: 'flex-end',
  alignItems: 'center',
};

export const inbreedingLabel: TypographyProps = {
  variant: 'caption',
  color: '#5c6bc0',
};

export const inbreedingResultLabel: TypographyProps = {
  variant: 'h6',
  sx: {
    color: '#1e88e5',
  },
};

export const inbreedingFounderLabel: TypographyProps = {
  variant: 'h5',
  sx: {
    color: 'rgba(30, 136, 229, 0.4)',
  },
};
