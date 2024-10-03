import { Routes,Route } from "react-router-dom"
import Login from "./login"
import Signup from "./Signup";
import AddBook from "./AddBook";
import BookList from "./Booklist";
import UpdateBook from "./UpdateBook";

const SRoutes=()=>{
    return(
  
        <Routes>
<Route path="/login" element={<Login/>}/>
<Route path ="/signup" element={<Signup/>}/>
<Route path ="/addbook" element={<AddBook/>}/>
<Route path ="/" element={<BookList/>}/>
<Route path="updatebook/:isbn" element={<UpdateBook/>} />

        </Routes>
    )
};
export default SRoutes;