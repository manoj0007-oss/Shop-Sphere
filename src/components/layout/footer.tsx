import Link from "next/link";
import { Separator } from "@/components/ui/separator";
export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div><h3 className="text-white font-bold mb-4">About</h3><ul className="space-y-2 text-sm"><li><Link href="#" className="hover:text-white transition">About Us</Link></li><li><Link href="#" className="hover:text-white transition">Careers</Link></li><li><Link href="#" className="hover:text-white transition">Press</Link></li></ul></div>
          <div><h3 className="text-white font-bold mb-4">Help</h3><ul className="space-y-2 text-sm"><li><Link href="#" className="hover:text-white transition">Payments</Link></li><li><Link href="#" className="hover:text-white transition">Shipping</Link></li><li><Link href="#" className="hover:text-white transition">Returns</Link></li><li><Link href="#" className="hover:text-white transition">FAQ</Link></li></ul></div>
          <div><h3 className="text-white font-bold mb-4">Policy</h3><ul className="space-y-2 text-sm"><li><Link href="#" className="hover:text-white transition">Return Policy</Link></li><li><Link href="#" className="hover:text-white transition">Terms of Use</Link></li><li><Link href="#" className="hover:text-white transition">Privacy</Link></li></ul></div>
          <div><h3 className="text-white font-bold mb-4">Contact</h3><ul className="space-y-2 text-sm"><li>support@shopsphere.in</li><li>1800-123-4567</li><li>Hyderabad, India</li></ul></div>
        </div>
        <Separator className="my-8 bg-gray-700" />
        <p className="text-center text-sm text-gray-500">&copy; 2026 ShopSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}
