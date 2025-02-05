import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

type ToggleDataProps = {
  contentAlwayVisible?: React.ReactNode;
  isEditButton?: boolean;
  isSaveButton?: boolean;
  isToggleButton?: boolean;
  isToggleIcon?: boolean;
  defaultExpanded?: boolean;
  title: string,
  children: React.ReactNode;
  onClickCreateButton?: () => void,
  onEditBorrower?: () => void;
  onSaveBorrower?: () => void;
};

export default function CollapseData({
  contentAlwayVisible = false,
  isEditButton = false,
  onEditBorrower,
  isSaveButton = false,
  isToggleButton = false,
  isToggleIcon = false,
  title = '',
  children,
  defaultExpanded = false,
  onClickCreateButton,
  onSaveBorrower,
}: ToggleDataProps) {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditBorrower = () => {
    setIsEditing(true);
    if (onEditBorrower) onEditBorrower();
  };

  const handleSaveBorrower = () => {
    setIsEditing(false);
    if (onSaveBorrower) onSaveBorrower();
  };

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box mt={2} sx={{ border: '2px solid #F0F0F1', borderRadius: 2, }}>
      <Stack
        sx={{
          borderBottom: '2px solid #F0F0F1',
          padding: '10px 16px',
        }}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Typography fontWeight={500}>{title}</Typography>
        <Box>
          <Stack direction="row" gap={1}>
            {isToggleButton && (
              <Button
                variant="contained"
                endIcon={
                  expanded ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )
                }
                onClick={handleToggle}
                color="info"
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  fontWeight:"400"
                }}>
                {expanded ? 'Show Less' : 'Show More'}
              </Button>
            )}
            {isToggleIcon && (
              <IconButton onClick={handleToggle}>
                {expanded ? (
                  <ExpandLessOutlinedIcon />
                ) : (
                  <ExpandMoreOutlinedIcon />
                )}
              </IconButton>
            )}
            {isSaveButton && (
              <Button variant="contained" color="success" onClick={onClickCreateButton}>
                Save
              </Button>
            )}
            {isEditing ? (
              <Button variant="contained" color="success" onClick={handleSaveBorrower}>
                Save
              </Button>
            ) : (
              isEditButton && (
                <Button variant="contained" color="info" onClick={handleEditBorrower}>
                  Edit
                </Button>
              )
            )}
          </Stack>
        </Box>
      </Stack>

      <Collapse in={true} timeout="auto" unmountOnExit>
        <Box sx={{px:2, pb:2}}>
          {
            contentAlwayVisible ? contentAlwayVisible : null
          }
        </Box>
      </Collapse>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{px:2, pb:2}}>{children}</Box>
      </Collapse>
    </Box>
  );
}
