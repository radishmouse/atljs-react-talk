
# Things:

## JSX will interpolate arrays of JSX values.

Meaning, you can have {someArray.map(function (el) { return <div>el</div>} }
And it will know that you mean, I want an array of divs, whose contents are the values of the array

## Rationale

- front end templating doesn't scale, we need something that does
- separation of concerns
- focuses on the view
    - drawing the UI
    - handling user events


