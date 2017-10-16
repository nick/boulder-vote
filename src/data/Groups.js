const Groups = [
  {
    id: 'better-boulder',
    name: 'Better Boulder',
    website: 'http://betterboulder.com',
    endorsements: 'http://betterboulder.com/city-council-candidate-endorsements/',
    facebook: 'BetterBoulder',
    twitter: 'ABetterBoulder'
  },
  {
    id: 'open-boulder',
    name: 'Open Boulder',
    website: 'http://openboulder.org',
    endorsements: 'http://openboulder.org/wp-content/uploads/2017/09/Endorsement_Announce_2017.pdf',
    facebook: 'OpenBoulder',
    twitter: 'OpenBoulder'
  },
  {
    id: 'engage-boulder',
    name: 'Engage Boulder',
    website: 'https://www.engageboulder.com',
    endorsements: 'https://www.engageboulder.com/candidates/',
    facebook: 'engageboulder',
    twitter: 'engageboulder'
  },
  {
    id: 'plan-boulder',
    name: 'PLAN Boulder',
    website: 'http://planboulder.org',
    endorsements: 'http://planboulder.org/uncategorized/plan-boulder-county-has-endorsed-the-following-candidates-for-the-2017-city-of-boulder-municipal-election/',
    facebook: 'PLANBoulderCounty',
    twitter: 'PLANBoulder'
  },
  {
    id: 'together4boulder',
    name: 'Together4Boulder',
    website: 'http://tg4b.org',
    endorsements: 'http://tg4b.org/who-we-are/',
    facebook: 'Together4Boulder',
    twitter: 'togethr4boulder'
  },
  {
    id: 'greater-gunbarrel',
    name: 'Greater Gunbarrel',
    website: 'http://www.greatergunbarrel.org',
    endorsements: 'http://www.greatergunbarrel.org/',
    facebook: '',
    twitter: ''
  },
  {
    id: 'daily-camera',
    name: 'Daily Camera',
    website: 'http://www.dailycamera.com',
    endorsements: 'http://www.dailycamera.com/editorials/ci_31358684/editorial-boulder-city-council',
    facebook: '',
    twitter: ''
  },
  {
    id: 'sierra-club',
    name: 'Sierra Club',
    website: 'http://www.sierraclub.org/colorado/2017-endorsements',
    endorsements: 'http://www.sierraclub.org/colorado/2017-endorsements',
    facebook: '',
    twitter: ''
  },
  {
    id: 'boulder-weekly',
    name: 'Boulder Weekly',
    website: 'http://www.boulderweekly.com',
    endorsements: 'http://www.boulderweekly.com/content-archives/voters-guide/vote-2017/election-2017/',
    facebook: 'boulderweeklymedia',
    twitter: 'boulderweekly'
  },
].sort((a, b) => {
  if (a.name > b.name) { return 1; }
  if (a.name < b.name) { return -1; }
  return 0;
})
export default Groups;
