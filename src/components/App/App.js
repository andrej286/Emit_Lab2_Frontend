import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "../Header/header";
import Books from "../Books/BookList/books";
import EShopService from "../../repository/eshopRepository";
import BookEdit from "../Books/BookEdit/bookEdit";
import BookAdd from "../Books/BookAdd/bookAdd";
import Categories from "../Categories/categories";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }
    render() {
        return(
             <Router>
                 <Header/>
                 <main>
                     <div className={"container"}>
                         <Routes>
                             <Route path={"/books/add"}
                                    element={<BookAdd onAddBook={this.addBook}
                                                        categories={this.state.categories}
                                                        authors={this.state.authors}/>}/>

                             <Route path={"/books/edit/:id"}
                                element={ <BookEdit onEditBook={this.editBook}
                                                    categories={this.state.categories}
                                                    authors={this.state.authors}
                                                    book={this.state.selectedBook}/>}/>

                             <Route path="books"
                                element={<Books books={this.state.books}
                                                onDelete={this.deleteBook}
                                                onEdit={this.getBook}
                                                onTake={this.takeCopy}/>}/>

                             <Route path={"/categories"} element={<Categories
                                                categories={this.state.categories}/>}/>

                         </Routes>
                     </div>
                 </main>

             </Router>

        );
    }
    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }
    loadBooks = () => {
        EShopService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }
    deleteBook = (id) => {
        EShopService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
    getBook = (id) => {
        EShopService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }
    editBook = (id, name, category, author, availableCopies) => {
        EShopService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }
    addBook = (name, category, author, availableCopies) => {
        EShopService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }
    takeCopy = (id) => {
        EShopService.takeCopy(id)
            .then(() => {
                this.loadBooks();
            });
    }
    loadCategories = () => {
        EShopService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }
    loadAuthors = () => {
        EShopService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }


}



export default App;
