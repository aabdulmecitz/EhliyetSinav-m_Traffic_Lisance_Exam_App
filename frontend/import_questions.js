const fs = require('fs');

const rawData = JSON.parse(fs.readFileSync('./src/data/raw_exams.json', 'utf8'));

let formattedQuestions = [];

rawData.forEach((exam) => {
  exam.questions.forEach((q) => {
    // Generate a unique ID
    const uniqueId = `${exam.examId}_${q.id}`;
    
    // Parse options safely
    const parseOption = (opt) => {
      if (!opt) return "";
      if (typeof opt === 'string') return opt;
      if (typeof opt === 'object' && opt.text) return opt.text;
      return "Görsel Seçenek"; // Fallback
    };

    formattedQuestions.push({
      id: uniqueId,
      category: q.category || 'Genel',
      questionText: q.questionText || '',
      optionA: parseOption(q.options?.A),
      optionB: parseOption(q.options?.B),
      optionC: parseOption(q.options?.C),
      optionD: parseOption(q.options?.D),
      correctAnswer: q.correctAnswerKey || 'A',
      imageUrl: q.imageUrl ? `https://raw.githubusercontent.com/ummugulsunn/ehliyet-rehberim/main/${q.imageUrl}` : null
    });
  });
});

fs.writeFileSync('./src/data/questions.json', JSON.stringify(formattedQuestions, null, 2));

console.log(`Successfully converted ${formattedQuestions.length} questions.`);
