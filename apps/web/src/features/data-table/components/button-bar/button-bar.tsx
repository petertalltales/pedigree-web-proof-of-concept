// Barrel files once again for clarity, lets me split everything up but have one import in the end, perfect.
// The conditional logic is a mess, needs to be turned into props and hooks.

import { Box, Stack, Typography } from '@mui/material';
import { useClearTableData } from '../../api/clear-table-data';
import { useSetBirthDates } from '../../api/set-birth-dates';
import { useSetDeathDates } from '../../api/set-death-dates';
import { useSetFounders } from '../../api/set-founders';
import { useSetMissingParentage } from '../../api/set-missing-parentage';
import { ButtonAction } from '../buttons/button-action';
import { ButtonUploadCSV } from '../buttons/button-upload-csv';
import { ButtonInbreeding } from '../buttons/button-inbreeding';
import { Individual } from '../../types/Individual';

interface ButtonBarProps {
  rows: Individual[];
}

export function ButtonBar({ rows }: ButtonBarProps) {
  const { mutate: clearData } = useClearTableData();
  const { mutate: setBirthDates } = useSetBirthDates();
  const { mutate: setDeathDates } = useSetDeathDates();
  const { mutate: correctParentage } = useSetMissingParentage();
  const { mutate: markFounders } = useSetFounders();

  // Perform all visibility calculations here
  const isClearDataDisabled = rows.length === 0;
  const isSetBirthDatesDisabled = !rows.some((row) => !row.birth_date);
  const isSetDeathDatesDisabled = !rows.some((row) => !row.death_date);
  const isCorrectParentageDisabled = !rows.some(
    (row) =>
      (!!row.father_id && !row.mother_id) || (!row.father_id && !!row.mother_id)
  );
  const isMarkFoundersDisabled = !rows.some(
    (row) => !row.father_id && !row.mother_id && !row.founder
  );
  const isSetInbreedingDisabled = !rows.some((row) => !row.inbreeding);

  return (
    <Box marginBottom={2}>
      <Typography variant="subtitle1" gutterBottom>
        Data Actions
      </Typography>
      <Stack direction="row" spacing={2}>
        {rows.length === 0 && <ButtonUploadCSV />}
        {rows.length > 0 && (
          <ButtonAction
            label="Clear Data"
            action={clearData}
            isDisabled={isClearDataDisabled}
            color="error" // Red color for Clear Data
          />
        )}

        {/* Other data actions */}
        <ButtonAction
          label="Set Birthdates"
          action={setBirthDates}
          isDisabled={isSetBirthDatesDisabled}
          color="primary" // Blue color
        />
        <ButtonAction
          label="Set Deathdates"
          action={setDeathDates}
          isDisabled={isSetDeathDatesDisabled}
          color="primary" // Blue color
        />
        <ButtonAction
          label="Correct Missing Parentage"
          action={correctParentage}
          isDisabled={isCorrectParentageDisabled}
          color="primary" // Blue color
        />
        <ButtonAction
          label="Mark Founders"
          action={markFounders}
          isDisabled={isMarkFoundersDisabled}
          color="primary" // Blue color
        />

        {/* Inbreeding Button */}
        <ButtonInbreeding isDisabled={isSetInbreedingDisabled} />
      </Stack>
    </Box>
  );
}
