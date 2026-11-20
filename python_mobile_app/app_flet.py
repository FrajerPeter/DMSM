"""
FP DROP — Python Mobile App (Flet / Flutter pre Python)
Fakulta podnikatelská VUT v Brně
Inštalácia: pip install flet
Spustenie: python app_flet.py
"""

import flet as ft
from data import PRODUCTS, DROPS, STUDENT_PROFILE

def main(page: ft.Page):
    page.title = "FP DROP — Mobile App"
    page.theme_mode = ft.ThemeMode.DARK
    page.window_width = 390
    page.window_height = 820
    page.window_resizable = True
    page.padding = 0
    page.bgcolor = "#050505"

    # App State
    cart = []
    wishlist = ["prod-01", "prod-13"]
    current_category = "ALL"

    # Notification Snackbar
    def notify(msg: str):
        page.snack_bar = ft.SnackBar(ft.Text(msg, color="#ffffff"), bgcolor="#1a1a1a")
        page.snack_bar.open = True
        page.update()

    # Content Container
    content_area = ft.Container(expand=True, padding=16)

    def add_to_cart(p, size="L"):
        cart.append({"product": p, "size": size})
        notify(f"Pridané do košíka: {p['name']} ({size})")
        update_nav_badge()

    def toggle_wishlist(p_id):
        if p_id in wishlist:
            wishlist.remove(p_id)
            notify("Odstránené z obľúbených")
        else:
            wishlist.append(p_id)
            notify("Uložené do obľúbených ❤️")
        build_current_tab()

    # Views
    def build_home_view():
        return ft.ListView(
            spacing=16,
            controls=[
                # Hero Banner
                ft.Container(
                    bgcolor="#121212",
                    border=ft.border.all(1, "#262626"),
                    border_radius=16,
                    padding=16,
                    content=ft.Column(
                        controls=[
                            ft.Row(
                                alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                                controls=[
                                    ft.Text("DROP 001 LIVE", size=10, weight=ft.FontWeight.BOLD, color="#10B981"),
                                    ft.Text("FP VUT BRNO", size=10, color="#888888"),
                                ]
                            ),
                            ft.Text("FIRST SEMESTER", size=22, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                            ft.Text("Tvůj nový univerzitní uniform. 240g česaná bio bavlna.", size=12, color="#CCCCCC"),
                            ft.ElevatedButton(
                                "PREZRIEŤ DROP",
                                bgcolor="#FFFFFF",
                                color="#000000",
                                on_click=lambda _: set_tab(1),
                                style=ft.ButtonStyle(shape=ft.RoundedRectangleBorder(radius=8))
                            )
                        ]
                    )
                ),
                ft.Text("POPULÁRNE KÚSKY", size=12, weight=ft.FontWeight.BOLD, color="#888888"),
                # Product List Preview
                *[
                    ft.Container(
                        bgcolor="#121212",
                        border=ft.border.all(1, "#222222"),
                        border_radius=12,
                        padding=12,
                        content=ft.Row(
                            alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                            controls=[
                                ft.Column(
                                    controls=[
                                        ft.Text(p["name"], size=13, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                                        ft.Text(f"{p['price']} Kč • {p['fit']}", size=11, color="#888888"),
                                    ]
                                ),
                                ft.IconButton(
                                    icon=ft.icons.FAVORITE if p["id"] in wishlist else ft.icons.FAVORITE_BORDER,
                                    icon_color="#EF4444" if p["id"] in wishlist else "#666666",
                                    on_click=lambda _, pid=p["id"]: toggle_wishlist(pid)
                                )
                            ]
                        )
                    ) for p in PRODUCTS[:4]
                ]
            ]
        )

    def build_shop_view():
        controls = [
            ft.Text("KATALÓG PRODUKTOV", size=16, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
        ]
        for p in PRODUCTS:
            controls.append(
                ft.Container(
                    bgcolor="#111111",
                    border=ft.border.all(1, "#222222"),
                    border_radius=12,
                    padding=12,
                    content=ft.Column(
                        controls=[
                            ft.Row(
                                alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                                controls=[
                                    ft.Text(p["category"], size=9, color="#888888", weight=ft.FontWeight.BOLD),
                                    ft.Text(p["status"], size=9, color="#10B981", weight=ft.FontWeight.BOLD),
                                ]
                            ),
                            ft.Text(p["name"], size=14, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                            ft.Text(f"{p['price']} Kč", size=13, color="#EEEEEE"),
                            ft.Text(p["material"], size=10, color="#777777"),
                            ft.Row(
                                alignment=ft.MainAxisAlignment.END,
                                controls=[
                                    ft.OutlinedButton(
                                        "+ KOŠÍK",
                                        on_click=lambda _, prod=p: add_to_cart(prod),
                                        style=ft.ButtonStyle(color="#FFFFFF", side=ft.BorderSide(1, "#444444"))
                                    )
                                ]
                            )
                        ]
                    )
                )
            )
        return ft.ListView(spacing=12, controls=controls)

    def build_drops_view():
        return ft.ListView(
            spacing=16,
            controls=[
                ft.Text("LIMITOVANÉ EDÍCIE", size=16, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                *[
                    ft.Container(
                        bgcolor="#121212",
                        border=ft.border.all(1, "#222222"),
                        border_radius=14,
                        padding=16,
                        content=ft.Column(
                            controls=[
                                ft.Row(
                                    alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                                    controls=[
                                        ft.Text(d["code"], size=11, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                                        ft.Text(d["status"], size=10, color="#10B981" if d["status"]=="LIVE" else "#888888")
                                    ]
                                ),
                                ft.Text(d["title"], size=16, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                                ft.Text(d["subtitle"], size=11, color="#CCCCCC"),
                                ft.Text(f"Dátum: {d['date']}", size=10, color="#777777")
                            ]
                        )
                    ) for d in DROPS
                ]
            ]
        )

    def build_wishlist_view():
        saved = [p for p in PRODUCTS if p["id"] in wishlist]
        if not saved:
            return ft.Column(
                alignment=ft.MainAxisAlignment.CENTER,
                horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                controls=[
                    ft.Icon(ft.icons.FAVORITE_BORDER, size=48, color="#555555"),
                    ft.Text("Žiadne obľúbené položky", color="#888888")
                ]
            )
        return ft.ListView(
            spacing=12,
            controls=[
                ft.Text(f"OBLÚBENÉ ({len(saved)})", size=16, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                *[
                    ft.Container(
                        bgcolor="#121212",
                        border=ft.border.all(1, "#222222"),
                        border_radius=12,
                        padding=12,
                        content=ft.Row(
                            alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                            controls=[
                                ft.Column(
                                    controls=[
                                        ft.Text(p["name"], size=13, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                                        ft.Text(f"{p['price']} Kč", size=12, color="#888888"),
                                    ]
                                ),
                                ft.ElevatedButton("DO KOŠÍKA", on_click=lambda _, prod=p: add_to_cart(prod), bgcolor="#FFFFFF", color="#000000")
                            ]
                        )
                    ) for p in saved
                ]
            ]
        )

    def build_profile_view():
        return ft.ListView(
            spacing=16,
            controls=[
                ft.Container(
                    bgcolor="#141414",
                    border=ft.border.all(1, "#262626"),
                    border_radius=16,
                    padding=16,
                    content=ft.Column(
                        controls=[
                            ft.Container(
                                content=ft.Text("DEMO PROFIL — osobné údaje, ISIC aj objednávky sú fiktívne ukážky.", size=10, color="#FDE68A"),
                                bgcolor="#451A03", padding=8, border_radius=8
                            ),
                            ft.Text(STUDENT_PROFILE["name"], size=18, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                            ft.Text(STUDENT_PROFILE["loyaltyLevel"], size=11, color="#10B981", weight=ft.FontWeight.BOLD),
                            ft.Text(f"ISIC: {STUDENT_PROFILE['isic']}", size=11, color="#888888"),
                            ft.Divider(color="#262626"),
                            ft.Text(f"Fakulta: {STUDENT_PROFILE['faculty']}", size=11, color="#CCCCCC"),
                            ft.Text(f"Kampus: {STUDENT_PROFILE['campusLocation']}", size=11, color="#CCCCCC"),
                            ft.Text(f"ECTS kredity: {STUDENT_PROFILE['ectsCredits']}", size=11, color="#CCCCCC"),
                        ]
                    )
                ),
                ft.Text("KOŠÍK & OBJEDNÁVKY", size=14, weight=ft.FontWeight.BOLD, color="#FFFFFF"),
                ft.Text(f"Položiek v košíku: {len(cart)}", size=12, color="#CCCCCC"),
                ft.ElevatedButton(
                    "DOKONČIŤ OBJEDNÁVKU (1-CLICK)",
                    bgcolor="#10B981",
                    color="#000000",
                    on_click=lambda _: notify("Objednávka bola úspešne odoslaná! 🎉")
                )
            ]
        )

    def build_current_tab():
        idx = nav_bar.selected_index
        if idx == 0:
            content_area.content = build_home_view()
        elif idx == 1:
            content_area.content = build_shop_view()
        elif idx == 2:
            content_area.content = build_drops_view()
        elif idx == 3:
            content_area.content = build_wishlist_view()
        elif idx == 4:
            content_area.content = build_profile_view()
        page.update()

    def set_tab(idx):
        nav_bar.selected_index = idx
        build_current_tab()

    def update_nav_badge():
        page.update()

    # Top App Bar
    app_bar = ft.Container(
        bgcolor="#0A0A0A",
        border=ft.border.only(bottom=ft.BorderSide(1, "#1E1E1E")),
        padding=ft.padding.symmetric(horizontal=16, vertical=12),
        content=ft.Row(
            alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
            controls=[
                ft.Text("FP DROP", size=16, weight=ft.FontWeight.BLACK, color="#FFFFFF"),
                ft.Container(
                    bgcolor="#1A1A1A",
                    padding=ft.padding.symmetric(horizontal=8, vertical=4),
                    border_radius=4,
                    content=ft.Text("BRNO", size=9, weight=ft.FontWeight.BOLD, color="#AAAAAA")
                )
            ]
        )
    )

    # Bottom Navigation Bar
    nav_bar = ft.NavigationBar(
        bgcolor="#0A0A0A",
        selected_index=0,
        on_change=lambda _: build_current_tab(),
        destinations=[
            ft.NavigationDestination(icon=ft.icons.HOME_OUTLINED, selected_icon=ft.icons.HOME, label="Home"),
            ft.NavigationDestination(icon=ft.icons.GRID_VIEW_OUTLINED, selected_icon=ft.icons.GRID_VIEW, label="Shop"),
            ft.NavigationDestination(icon=ft.icons.FLASH_ON_OUTLINED, selected_icon=ft.icons.FLASH_ON, label="Drops"),
            ft.NavigationDestination(icon=ft.icons.FAVORITE_OUTLINE, selected_icon=ft.icons.FAVORITE, label="Wishlist"),
            ft.NavigationDestination(icon=ft.icons.PERSON_OUTLINE, selected_icon=ft.icons.PERSON, label="Profil"),
        ]
    )

    # Mount UI
    page.add(
        ft.Column(
            expand=True,
            spacing=0,
            controls=[
                app_bar,
                content_area,
                nav_bar
            ]
        )
    )

    build_current_tab()

if __name__ == "__main__":
    ft.app(target=main)
