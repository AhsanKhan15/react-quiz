import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';
import './assets/style.css';
import quizService from './quizService';

class Quiz extends PureComponent {
    state = {
        questionBank: [],
        score: 0,
        responses: 0
    }

    getQuestions = () => {
        quizService().then(question => {

            this.setState({
                questionBank: question
            })
        })
    }
    computeAnswer = (answer, correctAnswer) => {
        const { score, responses } = this.state
        if (answer === correctAnswer) {
            this.setState({
                score: score + 1,
            })
        }
        this.setState({
            responses: responses < 5 ? responses+1 : 5

        })
    }

    playAgain=()=>{
        this.getQuestions();
        this.setState({
            score:0,
            responses:0
        })
    }
    componentDidMount() {
        this.getQuestions()
    }
    render() {
        const { questionBank,responses,score } = this.state
        
        
        return (
            <div className='container'>
                <div className='title'>Quiz App</div>
                {questionBank.length > 0 && 
                responses < 5 &&
                questionBank.map(({ question, answers, correct, questionId }) => (<QuestionBox question={question} options={answers} key={questionId} selected={answer => this.computeAnswer(answer, correct)} />))}
         {responses === 5 ? (<Result score={score} playAgain={this.playAgain}/>):null}
            </div>
        )
    }
}
ReactDom.render(<Quiz />, document.getElementById("root"));