import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  messages: { text: string, sender: string }[] = [];
  isAnswered: boolean=false;

  faqs: { question: string, answer: string }[] = [
    { question: 'What is the Account Aggregator (AA) ecosystem?', answer: 'The AA ecosystem allows consumers to securely share their financial data.' },
    { question: 'What is an Account Aggregator (AA)?', answer: 'An Account Aggregator is a financial data intermediary under the AA framework.' },
    { question: 'What is the process of applying for an NBFC-AA license?', answer: 'To apply for an NBFC-AA license, one must approach the RBI with the necessary documentation.' },
    { question: 'Is the Account Aggregator for individual consumers only?', answer: 'No, Account Aggregators can serve both individuals and businesses.' },
    { question: 'Which are the Account Aggregators in India?', answer: 'Some AAs in India include Finvu, OneMoney, CAMSFinServ, and others.' },
  ];

  constructor() {}

  sendHardcodedQuestion(question: string, answer: string) {
    this.messages.push({ text: question, sender: 'user' });

    this.messages.push({ text: answer, sender: 'bot' });
    this.isAnswered=true;
  }

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.messages.push({ text: this.userMessage, sender: 'user' });

    this.messages.push({ text: "I don't have an answer for that, but feel free to ask another question!", sender: 'bot' });

    this.userMessage = '';
  }
}
