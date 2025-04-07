import { Box, Typography } from '@mui/material'

export default function AboutNaclo() {
  return (
    <Box sx={{ py: 6, px: 3 }} className="wrapper">
      <Typography variant="h4" gutterBottom>
        What is NACLO?
      </Typography>
      <Typography variant="body1">
        NACLO is a contest in which high-school students solve linguistic
        problems. In solving these problems, students learn about the diversity
        and consistency of language, while exercising logic skills. No prior
        knowledge of linguistics or second languages is necessary. Professionals
        in linguistics, computational linguistics and language technologies use
        dozens of languages to create engaging problems that represent cutting
        edge issues in their fields. The competition has attracted top students
        to study and work in those same fields. It is truly an opportunity for
        young people to experience a taste of natural-language processing in the
        21st century.
      </Typography>
    </Box>
  )
}
