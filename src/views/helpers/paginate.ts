interface paginationInfo {
  totalStories: number;
  currentPage: number;
  totalPages: number;
  storiesForPage: number;
}

const paginate = (pagination: paginationInfo) => {
  if (pagination.totalPages === 1) return;

  let res = `<ul class="pagination justify-content-center">
    <li class="page-item ${pagination.currentPage === 0 && "disabled"}">
		<a class="page-link" arial-label="Previous" href="/stories?offset=${
      (pagination.currentPage - 1) * pagination.storiesForPage
    }">
			<span aria-hidden="true">&laquo;</span>
		</a>
	</li>
  `;

  for (let i = 0; i < pagination.totalPages; i++) {
    res += `<li class="page-item ${
      pagination.currentPage === i && "active"
    }"><a class="page-link" href="/stories?offset=${
      i * pagination.storiesForPage
    }">${i + 1}</a></li>`;
  }

  res += ` <li class="page-item ${
    pagination.currentPage === pagination.totalPages - 1 && "disabled"
  }">
		<a class="page-link" href="/stories?offset=${
      (pagination.currentPage + 1) * pagination.storiesForPage
    }" aria-label="Next">
			<span aria-hidden="true">&raquo;</span>
		</a>
	</li>
	</ul>
  </nav>`;

  return res;
};

export default paginate;
