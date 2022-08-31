import {useState,memo,createContext,useContext} from "react"
import { List, TextField, Button,Grid, InputLabel } from "@mui/material";
import {v4 as uuidv4} from "uuid"
import produce from "immer";
import QuestionListItem from "./QuestionListItem"

const InterviewLayout = ()=> {
    const [questions, setQuestions] = useState([]);

    const [questionAnswered, setQuestionsAnswered] = useState([]);

    const [form, setForm] = useState({
        label: "",
        description: ""
      });

    const _handleChange = ({ target: { value, name } }) => {
        setForm((prev) => ({
          ...prev,
          [name]: value
        }));
        console.log(form)
      };

    const _handleSubmit =(e) => {
        e.preventDefault();
        setQuestions((prevQuestions) =>[
            ...prevQuestions,
            {
                _id: uuidv4(),
                question: "Pregunta: ¿" + form.label  + "?"
            }
        ]);
        setForm({
            label: ""
        });
    };
    const _handleSubmitVideo = (question) =>{
        console.log("Layout")



    }
    const _handleDeleteItem = (questionId) => {
        console.log(questionId)
        setQuestions((prevQuestions) => {
          return prevQuestions.filter((question) => question._id !== questionId);
        });
      };
      
      const _handleClickCheckbox = ({ questionId, checked }) => {
        if (checked) {
            setQuestionsAnswered((prev) => [...prev, questionId]);
        } else {
            setQuestionsAnswered((prev) => prev.filter((_id) => _id !== questionId));
        }
      };
    
      const _handleChangeQuestion = (newQuestion) => {
        console.log("_handleChangeQuestion", newQuestion)
        setQuestions((prevQuestions) => {
          return produce(prevQuestions, (prevQuestionsDraft) => {
            const question = prevQuestionsDraft.find((question) => question._id === newQuestion._id);
            question["question"] = "Pregunta: ¿" +  newQuestion["label"] + "?";  
          });
        });
      };
    return (
        <>
        <div style={{margin:10}}>
            
            <form onSubmit={_handleSubmit}>
                <TextField
                    fullWidth
                    name="label"
                    placeholder="Ingresar Pregunta"
                    value={form.label}
                    onChange={_handleChange}
                ></TextField>
            </form>
        </div>
        <div >
            <Grid container spacing={0.1} align="center" style={{}}>
                {questions.map((question)=>(
                    <QuestionListItem
                        key={question._id}
                        question={question}
                        onDelete={_handleDeleteItem}
                        onChange={_handleChangeQuestion}
                        onToggle={_handleClickCheckbox}
                        selected={questionAnswered.includes(question._id)}
                        onSubmitVideo={_handleSubmitVideo}
                    />
                ))}
            </Grid>
            </div>
            </>
)


}
export default InterviewLayout;
