const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  "https://jutdgdrmzuktudxgixqq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dGRnZHJtenVrdHVkeGdpeHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MDk2OTcsImV4cCI6MjA5MTQ4NTY5N30.VLS2G0sAnmp40mbjnr70Pv_v5-9eHSOBSHfl2AtQhYM"
);

app.post('/api/attendance', async (req, res) => {
  const { name, studentId, sessionId } = req.body;

  const { data: session } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId);

  if (!session || session.length === 0) {
    return res.json({ success: false, message: "Invalid QR" });
  }

  const { data: existing } = await supabase
    .from('attendance')
    .select('*')
    .eq('student_id', studentId)
    .eq('session_id', sessionId);

  if (existing.length > 0) {
    return res.json({ success: false, message: "Already recorded" });
  }

  const { error } = await supabase
    .from('attendance')
    .insert([
      {
        name,
        student_id: studentId,
        session_id: sessionId,
        created_at: new Date()
      }
    ]);

  if (error) {
    return res.json({ success: false, message: "Insert failed" });
  }

  res.json({ success: true, message: "Attendance recorded ✅" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});