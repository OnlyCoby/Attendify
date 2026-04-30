const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
"https://jutdgdrmzuktudxgixqq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dGRnZHJtenVrdHVkeGdpeHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MDk2OTcsImV4cCI6MjA5MTQ4NTY5N30.VLS2G0sAnmp40mbjnr70Pv_v5-9eHSOBSHfl2AtQhYM"
);

module.exports = supabase;