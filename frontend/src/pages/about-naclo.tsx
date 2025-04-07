import React from 'react'
import { Typography } from '@mui/material'

const AboutNACLOPage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        margin: '64px',
        padding: '2rem 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className="wrapper">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: '#ff9a04', // Apply the orange color to the header
            fontWeight: 'bold',
          }}
        >
          About NACLO
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            lineHeight: 1.8,
            marginBottom: '2rem', // Increased spacing
          }}
        >
          NACLO was started in 2006 in order to promote Computational
          Linguistics and Linguistics in general in North America. Its founders
          include Lori Levin (Carnegie Mellon University, general chair),
          Dragomir Radev (University of Michigan, program chair), Tom Payne
          (University of Oregon), James Pustejovsky (Brandeis University,
          sponsorship chair), and Tanya Korelsky (NSF).
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: '#7125ce', // Apply purple color to sub-header
            fontWeight: 'bold',
            marginTop: '2rem',
          }}
        >
          History of Linguistic Challenges
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}
        >
          The idea of holding academic challenges in linguistics stems from a
          long tradition of linguistics and mathematics competitions, which
          began in Moscow in the 1960s. In 1984, Bulgaria began holding similar
          competitions, and contests were first held in the United States at the
          University of Oregon starting in 1998. Bulgaria hosted the First
          International Olympiad in Linguistics in Borovetz in September of
          2003, and subsequent International Olympiads have been held in Moscow,
          Russia in 2004, Leiden, The Netherlands in 2005, and in Tartu, Estonia
          in 2006. More recently, universities in Estonia, Finland, Netherlands,
          the United States, and other countries have begun sponsoring such
          outreach activities aimed at high school students. Participating as
          individuals and in national teams, students are given challenging sets
          of language data and language puzzles to solve, with the chance to win
          prizes and international recognition. Students learn about the
          richness, diversity, and systematicity of language, while exercising
          natural logic and reasoning skills. No prior knowledge of languages or
          linguistics is necessary, but the competitions have proven very
          successful in attracting top students to study in the field of
          linguistics and computational linguistics.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}
        >
          NACLO picks up on this long tradition, with a focus on computational
          thinking as it relates to solving linguistics problems. In addition to
          the traditional linguistics problems, NACLO endeavors to introduce
          students to computational problem solving as it relates specifically
          to natural language data.
        </Typography>
      </div>
    </div>
  )
}

export default AboutNACLOPage
