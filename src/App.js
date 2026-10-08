import "./styles.css";

import Autocomplete from "./Autocomplete";

const users = [
  "Harshal Roy",
  "Rahul Sharma",
  "Rohit Patil",
  "Priya Deshmukh",
  "Deepti Joshi",
  "Sneha Kulkarni",
  "Sanket Pawar",
  "Shubham More",
  "Akash Jadhav",
  "Amit Shah",

  "Neha Patil",
  "Riya Sharma",
  "Anjali Deshmukh",
  "Karan Joshi",
  "Vishal Kulkarni",
  "Nikhil Pawar",
  "Sagar More",
  "Aditya Jadhav",
  "Abhishek Shah",
  "Rajesh Patil",

  "Siddharth Sharma",
  "Aakash Deshmukh",
  "Pranav Joshi",
  "Manish Kulkarni",
  "Mayur Pawar",
  "Swapnil More",
  "Omkar Jadhav",
  "Tejas Shah",
  "Rohan Patil",
  "Yash Sharma",

  "Aishwarya Deshmukh",
  "Kavita Joshi",
  "Pallavi Kulkarni",
  "Shreya Pawar",
  "Tanvi More",
  "Vaibhav Jadhav",
  "Nitin Shah",
  "Sachin Patil",
  "Aniket Sharma",
  "Akshay Deshmukh",

  "Sonal Joshi",
  "Mrunal Kulkarni",
  "Snehal Pawar",
  "Pratik More",
  "Prathamesh Jadhav",
  "Chaitanya Shah",
  "Abhishek Patil",
  "Vivek Sharma",
  "Deepak Deshmukh",
  "Manoj Joshi",
];

function App() {
  const handleSelect = (user) => {
    console.log("Selected user:", user);
  };

  return (
    <div className="app">
      <h1>User Search</h1>

      <Autocomplete
        options={users}
        placeholder="Search users..."
        onSelect={handleSelect}
      />
    </div>
  );
}

export default App;