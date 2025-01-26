import { Box } from '@mui/material'
import { createLazyFileRoute } from '@tanstack/react-router'
const About=()=>{
  return <Box  >Hello from About!</Box>
}
export const Route = createLazyFileRoute('/about')({
  component: About,
})

