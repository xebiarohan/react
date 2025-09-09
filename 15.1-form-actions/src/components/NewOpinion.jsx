import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  const [formState, formAction, pending] = useActionState(opinionAction, {
    errors: null,
  });

  async function opinionAction(prevFormState, formAction) {
    const userName = formAction.get("userName");
    const title = formAction.get("title");
    const body = formAction.get("body");

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title must be atleast 5 characters long");
    }

    if (body.trim().length < 10 || body.trim().length > 3000) {
      errors.push("Opinion length must be within 10 to 3000 character long");
    }

    if (!userName.trim()) {
      errors.push("Please provide your name");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }

    await addOpinion({title, body, userName});

    return {
      errors: [],
    };
  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}> {error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
