
import routerEmployees from '../components/employees/employees.routes.js';


export const routes = (app) => {

  app.use('/api/employees', routerEmployees);

  app.use((req,res) => {
    res.status(404).json({mesagge: 'Error: enpoint not fount'})
  })

}