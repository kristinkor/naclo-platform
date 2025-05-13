import {
  Container,
  Typography,
  Link as MuiLink,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import Head from 'next/head'
import NextLink from 'next/link'

export default function SiteCoordinatorsPage() {
  return (
    <>
      <Head>
        <title>University Site Coordinators | NACLO</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            University Site Coordinators
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            The following handbooks contain important information for NACLO
            coordinators and participants.
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary={
                  <MuiLink
                    href="http://www.naclo.org/2024/2024NACLOStudenthandbook.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NACLO 2024 Student Handbook
                  </MuiLink>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <MuiLink
                    href="http://www.naclo.org/2024/2024NACLOCoordinatorHandbook.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NACLO 2024 Coordinator Handbook
                  </MuiLink>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <MuiLink
                    href="http://www.naclo.org/2021/2021-handbook-appendix.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NACLO Handbook Appendix (updated 2021)
                  </MuiLink>
                }
              />
            </ListItem>
          </List>

          <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
            If your university is listed in our{' '}
            <NextLink href="/university-sites" passHref legacyBehavior>
              <MuiLink>list of universities</MuiLink>
            </NextLink>
            , please contact{' '}
            <MuiLink href="mailto:nacloinquiries@googlegroups.com">
              nacloinquiries@googlegroups.com
            </MuiLink>{' '}
            to let us know you will be acting as a site host.
          </Typography>

          <Typography variant="body1">
            If your site is not listed, please also contact us at the same
            email.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
