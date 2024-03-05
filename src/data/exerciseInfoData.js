export const exerciseInfo = [
  {
    title:"Wrist Flexion",
  },
  {
    title:"Wrist Extension",
  },
  {
    title:"Ulnar Deviation",
  },
  {
    title:"Radial Deviation",
  },
];


export const patientDataColumns = [
  {
    field: "exerciseName",
    headerName: "Exercise Name",
    headerAlign: "left",
    flex: 1,
    fontWeight: "heavy",
    align: "center"
  },
  {
    field: "completionDate",
    headerName: "Completion Date",
    flex: 1,
  },
  {
    field: "repCompletion",
    headerName: "Rep Completion",
    flex: 1,
  },
  {
    field: "pain",
    headerName: "Pain Rating",
    flex: 1,
  },
  {
    field: "discomfort",
    headerName: "Discomfort Rating",
    flex: 1,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    flex: 3,
  },
]

export const exampleExerciseRating = [
  {
    id: 1,
    exerciseName:"Wrist Flexion",
    completionDate: "2024-02-28",
    repCompletion: "100%",
    pain: "7",
    discomfort: "5",
    notes: "I felt pretty good, but my wrist cracked a lot"
  },
  {
    id: 2,
    exerciseName:"Wrist Extension",
    completionDate: "2024-03-01",
    repCompletion: "100%",
    pain: "10",
    discomfort: "10",
    notes: "This one really hurt"
  },
  {
    id: 3,
    exerciseName:"Wrist Flexion",
    completionDate: "2024-03-03",
    repCompletion: "100%",
    pain: "10",
    discomfort: "10",
    notes: "I am attaching a long note to see how it looks in the table. I am attaching a long note to see how it looks in the table. I am attaching a long note to see how it looks in the table."
  },
];
