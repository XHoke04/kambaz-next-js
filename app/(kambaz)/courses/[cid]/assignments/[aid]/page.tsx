export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name"><strong>Assignment Name</strong></label><br /><br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br /><br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" type="number" defaultValue={100} />
          </td>
        </tr><br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
                <select id="wd-assignment-group">
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="PROJECT">PROJECT</option>
                </select>
            </td>
        </tr> <br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                    <option selected value="PERCENTAGE">Percentage</option>
                    <option value="LETTER">Letter Grade</option>
                </select>
            </td>
        </tr> <br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option selected value="ONLINE">Online</option>
                    <option value="ON-PAPER">On Paper</option>
                </select>
            </td>
        </tr> <br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-online-entry-options">Online Entry Options</label>
            </td>
            <td>
                <input type="checkbox" name="check-genre" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry">Text Entry</label><br/>

                <input type="checkbox" name="check-genre" id="wd-website-url"/>
                <label htmlFor="wd-website-url">Website URL</label><br/>

                <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                <input type="checkbox" name="check-genre" id="wd-file-uploads"/>
                <label htmlFor="wd-file-uploads">File Uploads</label>
            </td>
        </tr> <br />
        <tr>
          <td align="right" valign="top"></td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label><br />
            <input id="wd-assign-to" defaultValue="Everyone" />
          </td>
        </tr> <br />
        <tr>
            <td align="right" valign="top"></td>
            <td>
                <label htmlFor="wd-due-date">Due</label><br />
                <input defaultValue="2024-01-31" type="date" id="wd-due-date" />
            </td>
        </tr><br />
        <tr>
            <td align="right" valign="top"></td>
            <td>
                <table>
                  <tr>
                    <td>
                      <label htmlFor="wd-available-from">Available from</label><br />
                      <input defaultValue="2024-01-01" type="date" id="wd-available-from" />
                    </td>
                    <td>
                      <label htmlFor="wd-available-until">Until</label><br />
                      <input defaultValue="2024-01-01" type="date" id="wd-available-until" />
                    </td>
                  </tr>
                </table>
            </td>
        </tr>
      </table>
      <hr />
      <div style={{ textAlign: "right" }}>
        <button>Cancel</button>
        <button style={{ marginLeft: 8 }}>Save</button>
      </div>
    </div>
);}
