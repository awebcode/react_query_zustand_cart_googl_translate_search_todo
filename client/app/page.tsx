import ProductList from "@/components/CartComponent";
import Counter from "@/components/Counter";
import Dashboard from "@/components/Dashboard";
import MultiSelectDropdown from "@/components/MultiSelectDrop";
import Navbar from "@/components/Navbar";
import UseCallBack from "@/components/callback/UseCallback";
import UseMemo from "@/components/UseMemo";
import NameSearch from "@/components/filter/Search";
import UseRef from "@/components/ref/Ref";
import ClassCom from "@/components/lifecycle/ClassCom";
import { TabComponent } from "@/components/TabComponent";
import Tab1 from "@/components/tab/Tab1";
import TodoApp from "@/components/todo/Todo";
import NestedDropdown from "@/components/dropdown/Dropdown";
import ReactQuery from "@/components/react-query/ReactQuery";
import Fething from "@/components/react-query/Fething";
import Fetch from "@/components/react-query/Fetch";
import Todo from "@/components/react-query/Add_Todo";
import FetchTodo from "@/components/react-query/FetchTodo";
import Todo_query from "@/components/react-query/Todo_Query";
import TranslateComponent from "@/components/translate/Translate";

export default function Home() {
  const tabs = [
    { name: "tab1", content: <Tab1 /> },
    { name: "tab2", content: <p>Content for Tab 2 goes here.</p> },
    { name: "tab3", content: <p>Content for Tab 3 goes here.</p> },
  ];
  return (
    <div className="container p-4 text-white">
      <TranslateComponent/>
      {/* <ReactQuery/>*/}
      <Fething />
      {/* <Todo />
      <FetchTodo /> */}
      {/* <Todo_query/> */}
      {/* <Fetch/> */}
      {/* <NestedDropdown/> */}
      {/* <TodoApp/> */}
      {/* <TabComponent tabs={tabs} /> */}
      {/* <Counter />
      <ProductList/> */}
      {/* <UseCallBack /> */}
      {/* <ClassCom/> */}
      {/* <NameSearch/> */}
      {/* <UseRef/> */}
      {/* <Dashboard/> */}
      {/* <Navbar />
      <UseMemo />
      
      <Todo />
      <MultiSelectDropdown/> */}
    </div>
  );
}
