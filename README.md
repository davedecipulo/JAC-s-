# JAC's Snack Haven — User Guide

A coffee shop website with a live menu and admin panel for managing items.

---

## Overview

The site has two parts:

| Part | File | Who uses it |
|---|---|---|
| Customer site | `index.html` | Visitors browsing the menu |
| Admin panel | `admin/index.html` | Owner managing menu items |

---

## Customer Site

### Navigation

The navbar has links to four sections: **Home**, **About**, **Menu**, and **Contact**. On mobile, tap the hamburger icon (top-right) to open the menu.

### Menu

Click any tab to filter by category:

- **All Items** — shows everything
- **Drinks** — iced coffee, milkshakes, milktea, floats, etc.
- **Food** — burgers, sandwiches, waffles, combos, etc.
- **Pizza** — displayed as photo cards

The menu updates in real-time when the admin makes changes — no page refresh needed.

### Contact Form

Fill in your name, email, subject, and message, then click **Send Message**. A confirmation banner appears for 5 seconds. (Note: the form currently shows a success message only — no email is actually sent without additional backend setup.)

### Business Hours

The contact section shows live open/closed status based on your device's clock:

- Mon–Fri: 7:00 AM – 9:00 PM
- Saturday: 8:00 AM – 10:00 PM
- Sunday: 9:00 AM – 8:00 PM

### Dark Mode

Click the moon icon (🌙) in the navbar to toggle dark/light mode. Your preference is saved between visits.

---

## Admin Panel

Access it at `admin/index.html` or via the lock icon in the navbar.

### Logging In

Default password: **`jacs2024`**

Enter the password and press **Enter** or click **Log In**.

### Dashboard Stats

The top row shows counts at a glance: Total Items, Available, and per-category totals. These update live as you make changes.

### Managing Menu Items

#### Filtering & Searching

- **Search box** — type any part of an item name or subcategory
- **Category dropdown** — filter by Drinks, Food, or Pizza
- **Status dropdown** — show only Available or Unavailable items

#### Adding an Item

1. Click **+ Add Item**
2. Fill in the required fields (marked with `*`):
   - **Item Name** — e.g. `Biscoff Latte`
   - **Category** — Drinks, Food, or Pizza
   - **Subcategory** — type or pick from suggestions (e.g. `Iced Coffee`)
   - **Price Display** — type exactly as it should appear, e.g. `12oz ₱39 · 16oz ₱45`
3. Optional fields:
   - **Starting Price** — the lowest number, used for sorting
   - **Product Photo** — click the upload area or drag and drop a JPG/PNG/WEBP file (requires Supabase to be configured)
   - **Description** — e.g. add-ons or notes
   - **Available** — uncheck to hide the item from the public menu
   - **Featured** — marks the item with a star badge in the table
4. Click **Save Item**

#### Editing an Item

Click **Edit** on any row. The same form opens pre-filled. Change what you need, then click **Save Item**.

#### Toggling Availability

Click the **✓ On** / **✗ Off** button in the Status column to instantly show or hide an item on the public menu without deleting it.

#### Deleting an Item

Click **Delete**, then confirm in the prompt. This cannot be undone.

#### Resetting to Default

Click **Reset to Default** to wipe all changes and restore the original menu items. You will be asked to confirm first.

### Settings Tab

#### Supabase Status

Shows whether the site is connected to a Supabase database:

- **Green** — connected, changes persist and sync in real-time
- **Yellow** — not configured, changes are lost on page refresh

To connect Supabase, edit `js/supabase-config.js` with your project URL and anon key, then run `supabase-setup.sql` in your Supabase SQL Editor.

#### Changing the Admin Password

1. Enter your current password
2. Enter a new password (minimum 6 characters)
3. Confirm the new password
4. Click **Update Password**

The password is stored in your browser's `localStorage`. It is not synced across devices.

---

## Project Files

```
index.html              Customer-facing website
admin/index.html        Admin panel
css/styles.css          All styles for the customer site
js/main.js              Menu rendering, tabs, contact form, open/closed status
js/data.js              Default menu items and Supabase data helpers
js/supabase-config.js   Supabase credentials (edit this to enable persistence)
supabase-setup.sql      SQL to create the menu_items table in Supabase
```

---

## Setting Up Supabase (Optional)

Without Supabase, the menu uses built-in default data and admin changes are not saved after a page reload.

1. Create a free project at [supabase.com](https://supabase.com)
2. Open `js/supabase-config.js` and replace the placeholder URL and anon key with your project's values
3. Go to your Supabase project → SQL Editor, paste the contents of `supabase-setup.sql`, and run it
4. Reload the site — the Settings tab in admin should show a green "Connected" indicator
