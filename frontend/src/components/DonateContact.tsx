import { Typography, Button } from '@mui/material'

export default function DonateContact() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280 140"
        className="banner__wave upside"
      >
        <path
          d="M0 51.76c36.21-2.25 77.57-3.58 126.42-3.58 320 0 320 57 640 57 271.15 0 312.58-40.91 513.58-53.4V0H0z"
          fillOpacity=".2"
        />
        <path
          d="M0 24.31c43.46-5.69 94.56-9.25 158.42-9.25 320 0 320 89.24 640 89.24 256.13 0 307.28-57.16 481.58-80V0H0z"
          fillOpacity=".8"
        />
        <path d="M0 0v3.4C28.2 1.6 59.4.59 94.42.59c320 0 320 84.3 640 84.3 285 0 316.17-66.85 545.58-81.49V0z" />
      </svg>
      <div className="donation-block">
        <Typography variant="h4" gutterBottom>
          Support NACLO
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}
        >
          Help support NACLO by making a donation or becoming a problem
          contributor.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff9a04',
            color: 'white',
            fontSize: '18px',
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#e68900' },
          }}
        >
          Donate Now
        </Button>
        <Typography variant="h6" sx={{ mt: 4, padding: '16px' }}>
          Contact Us
        </Typography>
        <Typography variant="body2">
          Interested in contributing or have questions? Reach out at{' '}
          <a
            href="mailto:nacloinquiries@googlegroups.com"
            className="email-link"
            style={{ textDecoration: 'underline' }}
          >
            nacloinquiries@googlegroups.com
          </a>
          .
        </Typography>
      </div>
    </>
  )
}
