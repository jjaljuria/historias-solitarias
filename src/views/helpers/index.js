"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    date: function (date) {
        return `${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}-${date.getMonth() - 1}-${date.getFullYear()}`;
    },
    for: function (pagination) {
        let res = `${pagination.currentPage}<ul class="pagination justify-content-center">
    <li class="page-item ${pagination.currentPage === 0 && "disabled"}">
		<a class="page-link" arial-label="Previous" href="/stories?offset=${(pagination.currentPage - 1) * pagination.storiesForPage}">
			<span aria-hidden="true">&laquo;</span>
		</a>
	</li>
  `;
        for (let i = 0; i < pagination.totalPages; i++) {
            res += `<li class="page-item ${pagination.currentPage === i && "active"}"><a class="page-link" href="/stories?offset=${i * pagination.storiesForPage}">${i + 1}</a></li>`;
        }
        res += ` <li class="page-item ${pagination.currentPage === pagination.totalPages - 1 && "disabled"}">
		<a class="page-link" href="/stories?offset=${(pagination.currentPage + 1) * pagination.storiesForPage}" aria-label="Next">
			<span aria-hidden="true">&raquo;</span>
		</a>
	</li>
	</ul>
  </nav>`;
        return res;
    },
};
//# sourceMappingURL=index.js.map