# Mobile Dinner App

This is a simple food ordering system implemented in JavaScript. The program allows users to view a menu of food items, add them to a shopping cart, and place an order. The key features include:

## Features

- **Menu Display:** The program displays a list of food items with details such as name, ingredients, price, and an emoji representation.

- **Add to Cart:** Users can add items to their shopping cart by clicking the "Add to Cart" button next to each menu item.

- **Remove from Cart:** Users can remove items from the cart by clicking the "Remove" button within the cart section.

- **Order Submission:** Once the user is satisfied with their selection, they can submit the order. A modal will appear, prompting the user to enter their name. After submission, a confirmation message is displayed, and the page will reload after a few seconds.

## Usage

1. Open the `index.html` file in a web browser.
2. Browse through the menu items and click "Add to Cart" to select items.
3. View the shopping cart by clicking the cart icon.
4. Remove items from the cart if needed.
5. Click "Place Order" to submit your order.
6. Enter your name in the modal and submit the form.
7. A confirmation message will be displayed, and the page will reload.

## Dependencies

- The program uses the [UUID](https://github.com/uuidjs/uuid) library to generate unique identifiers for cart items.

## How to Run

- Ensure you have a modern web browser.
- Open the `index.html` file in the browser.

## Notes

- This implementation is a frontend-only solution, and no backend processing or storage is involved.
- The page reloads automatically after order submission.

